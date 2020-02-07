// Shared functions for form validation using RegEx, refactored for ease of control

function isPasswordSecure(password, password2) {
    if (password.length > 7  // Using 'if' for readability
        && password.match(/[0-9]+/) != null
        && password.match(/[$&+,:;=?@#|'<>.\-^*()%!]/) != null
        && password.match(/[A-Z]/) != null
        && password.match(/[a-z]/) != null
        && password === password2
    ) {
        return true
    } else {
        return false
    }
}

function isEmailProper(email) {
    return email.match(/([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/) != null
}

function isUserNameGood(username, length=2) {  // Used to ensure proper username length
    return username.length > 2
}

function isSecureFull(password, password2, username, email) {
        return (
            isPasswordSecure(password, password2)
            && isEmailProper(email)
            && isUserNameGood(username)
        )
}

export {
    isSecureFull,
    isEmailProper,
    isPasswordSecure
};