
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://xllhtmyzdfdqldxqedvb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbGh0bXl6ZGZkcWxkeHFlZHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMjU0NjQsImV4cCI6MjAxMTgwMTQ2NH0.WRa63kb6-D127yfaJ3bb3pWAmlm_EV6198STLXBDbwI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;