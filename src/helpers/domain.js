export default function getHostname(url) {
    return new URL(url).hostname;
}