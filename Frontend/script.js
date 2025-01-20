





// Base API URL
const API_BASE_URL = "http://localhost:5000/api/users";

// Utility function to handle API requests
async function apiRequest(endpoint, method = "GET", body = null, isFormData = false, token = null) {
    const options = {
        method,
        headers: isFormData
            ? { Authorization: `Bearer ${token || ""}` }
            : { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
    };
    if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    // Check for HTTP errors
    if (!response.ok) {
        throw new Error((await response.json()).message || "API Error");
    }

    return response.json();
}

// Handle Sign-Up Form Submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {

        const response = await fetch(`${API_BASE_URL}/register`, { // Replaced with provided code
            method: "POST",
            body: formData,
        });
        // const response = await fetch('http://localhost:5000/api/users/register', {
        //     method: 'POST',
        //     body: formData,
        // });

        if (!response.ok) throw new Error((await response.json()).message);

        const result = await response.json();
        alert(result.message || 'Sign-Up Successful!');
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message || 'Error during sign-up. Please try again.');
        console.error(error);
    }
});


// Handle Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await apiRequest("/login", "POST", { email, password });
        alert(response.message || "Login Successful!");

        // Save the token to localStorage for further use
        localStorage.setItem("authToken", response.token);

        // Redirect to listView.html
        window.location.href = "listView.html";
    } catch (error) {
        alert("Error during login. Please try again.");
        console.error(error);
    }
});

// Populate List View in listView.html
if (document.getElementById("userTableBody")) {
    async function loadUsers() {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Unauthorized. Please log in.");

            const users = await apiRequest("/", "GET", null, false, token);

            const tbody = document.getElementById("userTableBody");
            tbody.innerHTML = "";

            users.forEach((user) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.gender}</td>
                    <td>${user.age}</td>
                    <td>${user.qualifications}</td>
                    <td><img src="${user.profilePic}" alt="Profile Pic" width="50"></td>
                    <td>
                        <button onclick="editDetails('${user._id}')">Edit</button>
                        <button onclick="deleteUser('${user._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            alert("Error loading users. Please try again.");
            console.error(error);
        }
    }

    loadUsers();
}

// Redirect to Edit Page
function editDetails(userId) {
    localStorage.setItem("editUserId", userId);
    window.location.href = "details.html";
}

// Delete User
async function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Unauthorized. Please log in.");

            const response = await apiRequest(`/${userId}`, "DELETE", null, false, token);
            alert(response.message || "User deleted successfully!");
            window.location.reload();
        } catch (error) {
            alert("Error deleting user. Please try again.");
            console.error(error);
        }
    }
}

















// // Base API URL
// const API_BASE_URL = "http://localhost:5000/api/users";

// // Utility function to handle API requests
// async function apiRequest(endpoint, method = "GET", body = null, isFormData = false, token = null) {
//     const options = {
//         method,
//         headers: isFormData
//             ? { Authorization: `Bearer ${token || ""}` }
//             : { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
//     };
//     if (body) {
//         options.body = isFormData ? body : JSON.stringify(body);
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

//     // Check for HTTP errors
//     if (!response.ok) {
//         throw new Error((await response.json()).message || "API Error");
//     }

//     return response.json();
// }

// // Handle Login Form Submission
// document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//         const response = await apiRequest("/login", "POST", { email, password });
//         alert(response.message || "Login Successful!");

//         // Save the token to localStorage for further use
//         localStorage.setItem("authToken", response.token);

//         // Redirect to listView.html
//         window.location.href = "listview.html";
//     } catch (error) {
//         alert("Error during login. Please try again.");
//         console.error(error);
//     }
// });

// // Populate List View in listView.html
// if (document.getElementById("userTableBody")) {
//     async function loadUsers() {
//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) throw new Error("Unauthorized. Please log in.");

//             const response = await apiRequest("/", "GET", null, false, token);
//             const users = response.users;

//             const tbody = document.getElementById("userTableBody");
//             tbody.innerHTML = "";

//             users.forEach((user) => {
//                 const tr = document.createElement("tr");
//                 tr.innerHTML = `
//                     <td>${user.name}</td>
//                     <td>${user.email}</td>
//                     <td>${user.phone}</td>
//                     <td>${user.gender}</td>
//                     <td>${user.age}</td>
//                     <td>${user.qualifications}</td>
//                     <td><img src="${user.profilePic}" alt="Profile Pic" width="50"></td>
//                     <td>
//                         <button onclick="editDetails('${user._id}')">Edit</button>
//                         <button onclick="deleteUser('${user._id}')">Delete</button>
//                     </td>
//                 `;
//                 tbody.appendChild(tr);
//             });
//         } catch (error) {
//             alert("Error loading users. Please try again.");
//             console.error(error);
//         }
//     }

//     loadUsers();
// }

// // Redirect to Edit Page
// function editDetails(userId) {
//     localStorage.setItem("editUserId", userId);
//     window.location.href = "details.html";
// }

// // Delete User
// async function deleteUser(userId) {
//     if (confirm("Are you sure you want to delete this user?")) {
//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) throw new Error("Unauthorized. Please log in.");

//             const response = await apiRequest(`/${userId}`, "DELETE", null, false, token);
//             alert(response.message || "User deleted successfully!");
//             window.location.reload();
//         } catch (error) {
//             alert("Error deleting user. Please try again.");
//             console.error(error);
//         }
//     }
// }
