const myform = document.getElementById("myform");
const fileInput = document.getElementById("myimg");

function submitHandler(e) {
  e.preventDefault();
  const file = fileInput.files[0];

  if (!file) {
    alert("Please choose a file");
    return;
  }

  const reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = async function () {
    const binaryString = reader.result;
    const base64String = btoa(binaryString);

    // Send the base64String to the server using an HTTP request
    const url = "http://localhost:8000/upload";
    const body = base64String;

    const options = {
      method: "POST",
      body: body,
      redirect: "manual",
    };

    const response = await fetch(url, options);

    if (response.ok) {
      console.log("Image uploaded successfully");
    } else {
      console.error("Error uploading image");
    }
  };
}

myform.addEventListener("submit", (e) => submitHandler(e));
