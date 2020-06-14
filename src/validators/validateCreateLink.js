export default function validateCreateLink(values) {
    let errors = {};

    if (!values.description) {
        errors.description = "Description is required.";
    } else if (values.description.length < 10) {
        errors.description = "The description must be at least 10 characters long.";
    }

    if (!values.url) {
        errors.url = "URL is required.";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "URL is incorrect.";
    }

    return errors;
}