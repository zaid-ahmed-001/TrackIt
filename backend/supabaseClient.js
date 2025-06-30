import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tnlczbfzxyxxtfytyihs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubGN6YmZ6eHl4eHRmeXR5aWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjIxMDksImV4cCI6MjA2NjQzODEwOX0.3rWSekHt40skAwUuAVLwPOZEU5VV1RUEiA43FN0BuwU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 