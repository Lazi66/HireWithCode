import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cavsyljufzuakvveoeii.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdnN5bGp1Znp1YWt2dmVvZWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NDM1NjcsImV4cCI6MjA2MzMxOTU2N30.BF3hdEEIbnwoNj_xm1H7JmfRbcOFsNIkcWScwu1RZGs'
export const supabase = createClient(supabaseUrl, supabaseKey)
// 提交接受挑战表单
export async function submitChallenge(githubId, email) {
    const { data, error } = await supabase
    .from('git-message')
    .insert([{ github_id: githubId, email: email }])

    if (error) {
    console.error('提交失败:', error)
    return false
    }
    return true
}



// 提交完成挑战表单
export async function submitSubmission(githubUrl, vercelUrl) {
    const { data, error } = await supabase
    .from('submissions')
    .insert([{ github_url: githubUrl, vercel_url: vercelUrl }])

    if (error) {
    console.error('提交失败:', error)
    return false
    }
    return true
}

