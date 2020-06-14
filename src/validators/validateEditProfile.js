export default function validateEditProfile(values) {
    let errors = {};

    if (!values.name) {
        errors.name = "Username is required.";
    }

    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email is incorrect.";
    }

    if (values.newPassword.length < 6) {
        errors.newPassword = "Your password must be at least 6 characters long."
    }

    if (!values.currentPassword) {
        errors.currentPassword = "Current password is required."
    }

    return errors;
}