export const getGeoLocation = async () => {
    return await new Promise<{
        lat: string;
        lon: string;
    }>((resolve, reject) => {
        //get location from broswer api if browser support it
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) =>
                    resolve({
                        lat: pos.coords.latitude.toString(),
                        lon: pos.coords.longitude.toString(),
                    }),
                (error) => reject(error)
            );
        }
    });
};
