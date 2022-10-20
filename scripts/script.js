/* 

3 parts to event handling:

- What element?
- What type of event? submit
- How are we handling that event?
*/

const signUpFormEl = document.getElementById("signUpForm");

signUpFormEl.addEventListener("submit", (event) => {
    // handle the event
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const contactMethod = event.target.contactMethod.value;
    const visitPurpose = event.target.visitPurpose.value;
    const agreeToFun = event.target.agreeToFun.checked;

    console.log("name", name);
    console.log("email", email);
    console.log("phone", phone);
    console.log("contactMethod", contactMethod);
    console.log("visitPurpose", visitPurpose);
    console.log("agreeToFun", agreeToFun);

    // If invalid form -> return;
    if (!name || !email || !phone || !contactMethod || !visitPurpose || !agreeToFun) {
        //invalid form, handle accordingly

        const errorMessageEl = document.getElementById("error-message");
        errorMessageEl.innerText = "All form fields are required";
        
        return;
    }

    signUpFormEl.classList.add("form--hidden");

    /*
        <section class="submit-success-message">
            <h2>Thanks for submitting the form, {name}</h2>
            
            <p>We will contact you via {contactMethod} at {phone / email}</p>
            <p>You signed up for {visitPurpose}</p>
        </section>
    */

    const headingEl = document.createElement("h2");
    headingEl.innerText = "Thanks for submitting the form, " + name; 
    
    const contactMethodEl = document.createElement("p");

    if (contactMethod === "email") {
        contactMethodEl.innerText = "We will contact you via email at " + email;
    } else if (contactMethod === "phone") {
        contactMethodEl.innerText = "We will contact you via phone at " + phone;
    }

    const visitPurposeEl = document.createElement("p");
    visitPurposeEl.innerText = "You signed up for " + visitPurpose;

    const sectionEl = document.querySelector(".submit-success-message");
    sectionEl.appendChild(headingEl);
    sectionEl.appendChild(contactMethodEl);
    sectionEl.appendChild(visitPurposeEl);  
})