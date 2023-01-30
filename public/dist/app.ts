
async function handleRegister(event: any) {
  try {

    event.preventDefault();

    const password = event.target.elements.idPasswordRegister.value;
    const email = event.target.elements.idEmailRegister.value;

    //@ts-ignore
    const { data } = await axios.post("/api/v1/users/register", { email, password });

    if (!data.success) {
      throw new Error('Something went wrong.');
    }
    else {
      window.location.href = "./home.html"
    }

  } catch (error) {
    console.error(error);
  }
}

async function handleLogin(event: any) {
  try {
    event.preventDefault();

    const password = event.target.elements.idPasswordLogin.value;
    const email = event.target.elements.idEmailLogin.value;

    //@ts-ignore
    const { data } = await axios.post("/api/v1/users/login", { email, password });
    const { success, userDB } = data;

    if (success) {
      window.location.href = "./home.html"
    }
    else
      alert("Email and Password do not match.")
    } catch (error) {
      console.error(error);
    }
}

async function handleUpdateUser(event: any) {
  try {
    event.preventDefault()

    const email = (document.querySelector(`.clsEmailUpdate`) as HTMLInputElement).value
    const password = (document.querySelector(`.clsPasswordUpdate`) as HTMLInputElement).value

    if (email == ``) {
      alert(`Please, fill email field to update your password!`);
      return;
    }

    //@ts-ignore      
    const { data } = await axios.post(`/api/v1/users/update/${email}`, { password })
    const { success, userDB } = data;

    if (success) {
      alert(`Password updated!`);
      window.location.href = "./login.html"
    }
    else {
      alert(`No user found!`);
    }

  } catch (error) {
    console.error(error);
  }
}

async function handleRemoveUser(event: any) {
  try {
    event.preventDefault()

    const email = (document.querySelector(`.clsEmailRemove`) as HTMLInputElement).value

    //@ts-ignore
    const { data } = await axios.delete(`/api/v1/users/${email}`);
    const { success, userDB } = data;

    if (success) {
      alert(`User removed!`);
      window.location.href = "./index.html"
    }   

  } catch (error) { 
     console.error(error);
  }
}
