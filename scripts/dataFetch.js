const dataFetch = async () => {
    const promise = await fetch(`../data/data.json`);
    const data = await promise.json();
    return data.People;
}

export { dataFetch }