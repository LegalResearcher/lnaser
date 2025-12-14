-- Create enum for document categories
CREATE TYPE public.library_category AS ENUM (
  'yemeni_laws',
  'legal_rulings', 
  'research',
  'arab_laws',
  'legal_templates'
);

-- Create enum for document types
CREATE TYPE public.document_type AS ENUM (
  'constitution',
  'law',
  'regulation',
  'agreement',
  'ruling',
  'research_paper',
  'reference',
  'contract_template',
  'memo_template',
  'other'
);

-- Create library_documents table for all legal documents
CREATE TABLE public.library_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category library_category NOT NULL,
  document_type document_type NOT NULL DEFAULT 'other',
  content TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  is_downloadable BOOLEAN DEFAULT true,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on library_documents
ALTER TABLE public.library_documents ENABLE ROW LEVEL SECURITY;

-- Public read access for library documents (everyone can view)
CREATE POLICY "Library documents are publicly viewable"
ON public.library_documents
FOR SELECT
USING (true);

-- Create storage bucket for legal documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'legal-documents',
  'legal-documents', 
  true,
  52428800,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Allow public read access to legal documents storage
CREATE POLICY "Legal documents are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'legal-documents');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_library_documents_updated_at
BEFORE UPDATE ON public.library_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster category lookups
CREATE INDEX idx_library_documents_category ON public.library_documents(category);
CREATE INDEX idx_library_documents_type ON public.library_documents(document_type);