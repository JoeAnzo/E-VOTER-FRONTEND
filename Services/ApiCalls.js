 const base_url = import.meta.env.VITE_BACKEND_URL
async function searchStudent(name) {
  try {
    const response = await fetch(`${base_url}/v1/api/Students/search?q=${name}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}

async function fetchStudent(name,Class,Stream) {
  try {
    const response = await fetch(`${base_url}/v1/api/Students/One?Name=${name}&Class=${Class}&Stream=${Stream}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}

async function fetchPrefectPosts(){
  try{
    const response = await fetch(`${base_url}/v1/api/Candidates/posts`)
    const data = await response.json()
    return data
  } catch(error){
    console.log(error.message)
  }
}
async function fetchCandidatesPerPost(post) {
  try{
    const response = await fetch(`${base_url}/v1/api/Candidates/posts/${post}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}

async function getAdminUser(username,password){
  try{
    const response = await fetch(`${base_url}/v1/api/admin/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(
        {
          username:username,
          password:password
        }
      )
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export  {searchStudent,fetchStudent,fetchPrefectPosts,fetchCandidatesPerPost,getAdminUser}