import Students from "../Pages/ADMIN/Students"

 const base_url = import.meta.env.VITE_BACKEND_URL

async function searchStudent(name) {
  try {
    const response = await fetch(`${base_url}/v1/api/Students/search?q=${name}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function searchCandidate(name) {
  try {
    const response = await fetch(`${base_url}/v1/api/Candidates/search?name=${name}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function fetchStudent(name, Class, Stream) {
  try {
    const response = await fetch(`${base_url}/v1/api/Students/One?Name=${name}&Class=${Class}&Stream=${Stream}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function fetchPrefectPosts() {
  try {
    const response = await fetch(`${base_url}/v1/api/Candidates/posts`)
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function submitVotes(votes,code){
  console.log(votes)
  try {
    const response = await fetch(`${base_url}/v1/api/Votes`,{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({
        votersCode:code,
        votes:votes
      })
    })

    if (!response.ok){
      throw new Error(`HTTP error ! status:${response.status}`)
    }
      const data = await response.json()
      return {success:true,data:data}
  } catch (error) {
    return {success:false,error:error.message}
  }
}

async function fetchCandidatesPerPost(post) {
  try {
    const response = await fetch(`${base_url}/v1/api/Candidates/posts/${post}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function getAdminUser(username, password) {
  try {
    const response = await fetch(`${base_url}/v1/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function fetchStudents(){
  try {
    const response = await fetch(`${base_url}/v1/api/Students`)
    if (response.ok){
      const data = await response.json()
      return {
        success:true,
        data:data
      }
    } else {
      throw new Error(`HTTP Error! status: ${response.status}`)
    }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message } 
  }
}

async function fetchStaffMembers(){
  try {
    const response = await fetch(`${base_url}/v1/api/Staff`)
    if (response.ok){
      const data = await response.json()
      return {
        success:true,
        data:data
      }
    } else {
      throw new Error(`HTTP Error! status: ${response.status}`)
    }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message } 
  }
}

async function fetchStudentsPerClass(grade){
  try {
    const response = await fetch(`${base_url}/v1/api/Students/Class/${grade}`)
    if (response.ok){
      const data = await response.json()
      return {
        success:true,
        data:data
      }
    } else {
      throw new Error(`HTTP Error! status: ${response.status}`)
    }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function fetchPrefects(){
  try {
    const response = await fetch(`${base_url}/v1/api/Candidates`)
    if (response.ok){
      const data = await response.json()
      return {
        success:true,
        data:data
      }
    } else {
      throw new Error(`HTTP Error! status: ${response.status}`)
    }
  } catch (error) {
    console.log(error.message)
    return { success: false, error: error.message }
  }
}

async function fetchResultsPerPost(post) {
  try {
    const respond = await fetch(`${base_url}/v1/api/Votes/${post}`)
    if (respond.ok){
      const results = await respond.json()
      return {
        success:true,
        data:results
      }
    } else {
      throw new Error(`HTTP Error ! status ${respond.status}`)
    }
  } catch (error) {
    return {
      success:false,
      error:error.message
    }
  }
}

async function uploadFile(formData){
  try {
    const response = await fetch(`${base_url}/v1/api/admin/students/upload`, {
      method: 'POST',
      body: formData
    })

    const contentType = response.headers.get('content-type') || ''
    let result

    if (contentType.includes('application/json')) {
      result = await response.json()
    } else {
      const text = await response.text()
      result = { success: response.ok, message: text }
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || `Upload failed (${response.status})`)
    }

    return result
  } catch (error) {
    console.error('Error uploading file', error)
    return { success: false, error: error.message }
  }
}

async function generateOTPsForStudents(){
  try{
    const response = await fetch(`${base_url}/v1/api/admin/generateOTPs/Students`,{
      method:'POST'
    })
    if (response.ok){
      const data = await response.json()
      return {
        success:true,
        data:data
      }
    } else {
      return {
        success:false,
        message:'Error generating OTPs'
      }
    }
  } catch(err){
    return {
      success:false,
      message:err.message
    }
  }
}

async function generateOTPsForStaff(){
  try{
    const response = await fetch(`${base_url}/v1/api/admin/generateOTPs/Staff`,{
      method:'POST'
    })
    if (response.ok){
      const data = await response.json()
      return {
        success:true,
        data:data
      }
    } else {
      return {
        success:false,
        message:'Error generating OTPs'
      }
    }
  } catch(err){
    return {
      success:false,
      message:err.message
    }
  }
}

async function exportStudentList(){
  try{
    const response = await fetch(`${base_url}/v1/api/admin/Students/export-csv`)
    if (response.ok){
     return {
      success:true,
      message:'Exported list successfully'
     }
    } else {
      return {
        success:false,
        message:'Error exporting students List'
      }
    }
  } catch(err){
    return {
      success:false,
      message:err.message
    }
  }
}

export {submitVotes,searchCandidate,exportStudentList,generateOTPsForStaff,generateOTPsForStudents,uploadFile,fetchStaffMembers,fetchResultsPerPost,searchStudent, fetchStudent, fetchPrefectPosts, fetchCandidatesPerPost, getAdminUser,fetchStudents,fetchPrefects,fetchStudentsPerClass }