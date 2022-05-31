
    const body = document.body;
    const overLayTxt = document.querySelector('.cover-text')

    const lgModal = document.querySelector('.login-container')
    const regModal = document.querySelector('.register-container')
    const delModal = document.querySelector('.delete-container')
    const editModal = document.querySelector('.edit-container')

    const lgClose = document.querySelector('.lg-close')
    const regClose = document.querySelector('.reg-close')
    const delClose = document.querySelector('.del-close')
    const editClose = document.querySelector('.edit-close')

    const getStarted = document.querySelector('.get-Started')
    const loginBtn = document.querySelector('.login-button')
    const deleteBtn = document.querySelector('.delete-button')
    const editBtn = document.querySelector('.edit-button')

    const registerForm = document.querySelector('.register-form')
    const loginForm = document.querySelector('.loginform')
    const deleteForm = document.querySelector('.delete-form')
    const editFrom = document.querySelector('.edit-form')
  
  
    
    /**
     * Hide Welcome msg and display login form
    */
    loginBtn.addEventListener('click', (e) => {
      lgModal.style.display = "block";
      overLayTxt.style.display = "none";
    })

    /**
     * Revert the above on login form exit
    */
    lgClose.addEventListener('click', (e) =>{
      lgModal.style.display = "none";
      overLayTxt.style.display = "block";
    })

    deleteBtn.addEventListener('click', (e) => {
      delModal.style.display = "block"
      overLayTxt.style.display = "none";
    })

    delClose.addEventListener('click', (e) =>{
      delModal.style.display = "none";
      overLayTxt.style.display = "block";
    })

    getStarted.addEventListener('click', (e) => {
      regModal.style.display = "block";
      overLayTxt.style.display = "none";
    })

    regClose.addEventListener('click', (e) =>{
      regModal.style.display = "none";
      overLayTxt.style.display = "block";
    })
      

    editBtn.addEventListener('click', (e) => {
      editModal.style.display = "block";
      overLayTxt.style.display = "none";
    })
    
    editClose.addEventListener('click', (e) => {
      editModal.style.display = "none";
      overLayTxt.style.display = "block ";
    })

    const registerUser = async (e) => {
      e.preventDefault();
      console.log('register User Front End Form')
      
      /**
       * Instantiate FormData
       * use spread operation to generate an Array of Arrays
       * Create an object from the arrays and stringfy 
       */
      const formData = new FormData(registerForm)
      const values = [...formData.entries()];
      const formDataStr = JSON.stringify(Object.fromEntries(values))
      console.log(formDataStr)
      try {
        const result = await fetch('https://student-mvp.herokuapp.com/index.html', {
          method: "POST",
          headers:({
            'Content-Type': 'application/json',
            'X-Custom-Header': 'RegisterUserForm'
          }),
          redirect: 'follow',
          body: formDataStr,
        })
        if(result.redirected) window.location.href = result.url; 
      } catch (error) {
        if(error) throw error;
      }
    }


    const deleteUser = async(e) => {
      e.preventDefault();
      const formData = new FormData(registerForm)
      const values = [...formData.entries()];
      const formDataStr = JSON.stringify(Object.fromEntries(values))
      try {
        const result = await fetch('https://student-mvp.herokuapp.com/index.html', {
          method: "DELETE",
          headers:({
            'Content-Type': 'application/json',
            'X-Custom-Header': 'DeleteUserForm'
          }),
          redirect: 'follow',
          body: formDataStr,
        })
        const {message} = await result.json()
        alert(message)
      } catch (error) {
        if(error) throw error;
      }
    }
    const editUser = async(e) => {
      e.preventDefault();
      const formData = new FormData(registerForm)
      const values = [...formData.entries()];
      const formDataStr = JSON.stringify(Object.fromEntries(values))
      try {
        const result = await fetch('https://student-mvp.herokuapp.com/index.html', {
          method: "PATCH",
          headers:({
            'Content-Type': 'application/json',
            'X-Custom-Header': 'EditUserFrom'
          }),
          redirect: 'follow',
          body: formDataStr,
        })
        const {message} = await result.json()
        alert(message)
      } catch (error) {
        if(error) throw error;
      }
    }
    // const loginUser = async (e) => {
    //   e.preventDefault();
    //   console.log('login User Front End Form')
      
    //   /**
    //    * Instantiate FormData
    //    * use spread operation to generate an Array of Arrays
    //    * Create an object from the arrays and stringfy 
    //    */
    //   const formData = new FormData(loginForm)
    //   const values = [...formData.entries()];
    //   const lgFormDataStr = JSON.stringify(Object.fromEntries(values))
    //   console.log(lgFormDataStr)
    //   try {
    //     const result = await fetch('http://localhost:5000/index.html/', {
    //       method: "POST",
    //       headers:({
    //         'Content-Type': 'application/json',
    //         'X-Custom-Header': 'LoginForm'
    //       }),
    //       body: lgFormDataStr,
    //     })
    //   } catch (error) {
    //     if(error) throw error;
    //   }
    // }






    registerForm.addEventListener('submit', registerUser)
    deleteForm.addEventListener('submit', deleteUser)
    editFrom.addEventListener('submit', editUser)