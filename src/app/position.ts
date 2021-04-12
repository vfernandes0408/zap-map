const getCurrentGps = async () => {
    navigator.geolocation.getCurrentPosition((position: any) => position);
}

export { getCurrentGps }