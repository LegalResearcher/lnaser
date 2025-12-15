-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS policy for user_roles: admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin policies for library_documents
CREATE POLICY "Admins can insert documents"
ON public.library_documents
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update documents"
ON public.library_documents
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete documents"
ON public.library_documents
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Storage policies for admins
CREATE POLICY "Admins can upload legal documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'legal-documents' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update legal documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'legal-documents' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete legal documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'legal-documents' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Public can view legal documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'legal-documents');