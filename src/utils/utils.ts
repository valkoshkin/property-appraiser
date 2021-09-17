const formatCarBrands = (carBrandsArray: any) => {
    return carBrandsArray.map((element: (string | number)[]) => ({
        brand: element[0],
        id: element[1]
    }));
};

const formatCarModels = (carModelsArray: any) => {
    return carModelsArray.map((element: (string | number)[]) => ({
        model: element[0],
        id: element[1]
    }));
};

export { formatCarBrands, formatCarModels };
