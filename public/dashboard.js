
const {origin, pathname} = window.location
const postTo = `${origin}/addPost`
const cookie = parseInt(document.cookie.split('=')[1])



const postForm = document.querySelector('.create-post-form')
const shareBtn = document.querySelector('#Share-post')
const yourPosts = document.querySelector('.your-posts')
const displayPostContainer = document.querySelector('.display-posts')
const editModal = document.querySelector('.edit-container')
const editClose = document.querySelector('.edit-close')
const editBtn = document.getElementById('edit-button')
const editForm = document.querySelector('.edit-form')
const editFormSubmit = document.querySelector('.edit-form-Btn')
const deletePostBtn = document.querySelector('.deletePost')
const centerContainer = document.querySelector('.cover-text')
const navBar = document.querySelector('.nav')
const aboutMeName = document.querySelector('.aboutMeName')
const aboutMeEmail = document.querySelector('.aboutMeEmail')
const welcomeMsg = document.querySelector('.welcomeMsg')

const openNav= ()=>{
  navBar.style.width = "250px"
}
const closeNav = () => navBar.style.width = "0px"


const userDisplayChanges = (firstName, lastName, userEmail) => {
  aboutMeName.textContent = `${firstName} ${lastName}`;
  aboutMeEmail.textContent = `${userEmail}`;
  welcomeMsg.textContent = `Welcome ${firstName}`;
}

const deletePost = async (e) => {
  const delObj = {}
  delObj['post_id'] = e.target.id
  let postIdToStr = JSON.stringify(delObj)
  console.log(delObj)
  let postIdToDelete = document.getElementById(e.target.id)
  postIdToDelete.remove();
  try {
    const response = await fetch(`${pathname}/remove`, {
        method:'DELETE',
        headers:({
          'Content-Type': 'application/json',
          'X-Custom-Header': 'Delete Post'
        }),
        redirect: 'follow',
        body: postIdToStr,
      });
      console.log(response.json())
    } catch (error) {
      if(error) console.log(error);
    }
}

const getUsersPosts = (userPosts) => {
  
  userPosts.forEach(element => {
    
  let newPost = yourPosts.cloneNode(true)
  console.log(newPost)

  newPost.setAttribute('id', element.post_id);
  
  let newPostSpan = document.createElement('span')
  newPostSpan.classList.add('deletePost')
  newPostSpan.innerHTML = '&times;'
  newPostSpan.setAttribute('id', element.post_id);
  newPostSpan.addEventListener('click', deletePost)

  let newPostTitle = document.createElement('h3')
  newPostTitle.classList.add('yp_title')
  newPostTitle.textContent = element.post_title

  let newPostContent = document.createElement('p1')
  newPostContent.classList.add('yp_text')
  newPostContent.textContent = element.post_textcontent
  
  newPost.appendChild(newPostSpan)
  newPost.appendChild(newPostTitle)
  newPost.appendChild(newPostContent)

  displayPostContainer.appendChild(newPost)

  })
}

const getUserData = async (cookie) => {

try {
  const response = await fetch(
    `${pathname}/${cookie}`,{
      method: 'GET',
    }
    );
    
   return response.json()
} catch (error) {
  if(error) throw error
  }
}

window.onload = getUserData(cookie).then(data => {
  console.log('front end fetch data', data)
  const {user, posts} = data
  
  userDisplayChanges(user.f_name, user.l_name, user.email);
  getUsersPosts(posts);

}).catch(error => console.log(error))

// document.addEventListener('DomContentLoaded', (event) => {
//   profileEmail.textContent = window.localStorage.getItem('userEmail')
// })


const cloneNdAdd = (sharedPost) => {
  let newPost = yourPosts.cloneNode()
  
  newPost.setAttribute('id', 'post1');
  
  let newPostSpan = document.createElement('span')
  newPostSpan.classList.add('deletePost')
  newPostSpan.innerHTML = '&times;'
  newPostSpan.setAttribute('id', 'post1');
  newPostSpan.addEventListener('click', deletePost)
  
  let newPostTitle = document.createElement('h3')
  newPostTitle.classList.add('yp_title')
  newPostTitle.textContent = sharedPost.post_title
  
  let newPostContent = document.createElement('p1')
  newPostContent.classList.add('yp_text')
  newPostContent.textContent = sharedPost.post_content
  
  newPost.appendChild(newPostSpan)
  newPost.appendChild(newPostTitle)
  newPost.appendChild(newPostContent)
  console.log(newPost)
  displayPostContainer.appendChild(newPost)
  
}


const addPost = async (e) => {
  e.preventDefault();
  const formData = new FormData(postForm)
  const values = [...formData.entries()]
  const objFromVals = Object.fromEntries(values)
  cloneNdAdd(objFromVals)
  objFromVals['owner'] = cookie;
  const valuesStr = JSON.stringify(objFromVals)
  console.log(valuesStr)
  try {
  const response = await fetch(`${pathname}/${cookie}/addPost`, {
      method:'POST',
      headers:({
        'Content-Type': 'application/json',
        'X-Custom-Header': 'Create Post'
      }),
      redirect: 'follow',
      body: valuesStr,
    });
    console.log(response.json())
  } catch (error) {
    if(error) console.log(error);
  }
}
const editUser = async(e) => {
  e.preventDefault();
  const formData = new FormData(editForm)
  const values = [...formData.entries()];
  const valuesObj = Object.fromEntries(values)
  valuesObj['user_id'] = cookie
  const formDataStr = JSON.stringify(valuesObj)
  console.log(formDataStr)
  try {
    const result = await fetch('https://student-mvp.herokuapp.com/dashboard.html', {
      method: "PUT",
      headers:({
        'Content-Type': 'application/json',
        'X-Custom-Header': 'EditUserFrom'
      }),
      redirect: 'follow',
      body: formDataStr,
    })
   console.log(result.json())
  } catch (error) {
    if(error) throw error;
  }
}
editBtn.addEventListener('click', (e) => {
  editModal.style.display = "block";
})
editClose.addEventListener('click', (e) => {
  editModal.style.display = "none";
})

shareBtn.addEventListener('click', addPost)
deletePostBtn.addEventListener('click', deletePost)
editFormSubmit.addEventListener('click', editUser)   