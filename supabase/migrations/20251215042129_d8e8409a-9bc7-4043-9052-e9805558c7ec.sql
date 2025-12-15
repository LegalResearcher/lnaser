-- Add new columns for multimedia support
ALTER TABLE public.library_documents 
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'document' CHECK (media_type IN ('document', 'image', 'video')),
ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS image_urls TEXT[],
ADD COLUMN IF NOT EXISTS video_source TEXT CHECK (video_source IN ('youtube', 'facebook', 'vimeo', 'tiktok', 'instagram', 'twitter', 'telegram', 'direct', NULL)),
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT;