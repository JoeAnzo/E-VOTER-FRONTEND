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
  }
}

export { searchStudent, fetchStudent, fetchPrefectPosts, fetchCandidatesPerPost, getAdminUser,fetchStudents,fetchPrefects,fetchStudentsPerClass }