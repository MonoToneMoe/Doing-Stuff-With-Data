import { dataFetch } from "./dataFetch.js";

let dataDisplay = document.getElementById('dataDisplay');
let dataSelect = document.getElementById('dataSelect');
let sortId = document.getElementById('sortId');
let sortFirstName = document.getElementById('sortFirstName');
let sortLastName = document.getElementById('sortLastName');
let sortEmail = document.getElementById('sortEmail');
let sortHeight = document.getElementById('sortHeight');
let sortAge = document.getElementById('sortAge');
let pagination = document.getElementById('pagination');

let sortBy = '';
let elementsPerPage = 10;
let currentPage = 1;
let sortDirection = 'asc';

const displayData = async () => {
    let data = await dataFetch();
    dataDisplay.textContent = '';

    data.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const startIndex = (currentPage - 1) * elementsPerPage;
    const endIndex = Math.min(startIndex + elementsPerPage, data.length);

    data.slice(startIndex, endIndex).forEach(element => {
        let tableRowElement = document.createElement('tr');
        let idElement = document.createElement('th');
        let firstNameElement = document.createElement('td');
        let lastNameElement = document.createElement('td');
        let emailElement = document.createElement('td');
        let heightElement = document.createElement('td');
        let ageElement = document.createElement('td');

        idElement.textContent = element.Id;
        firstNameElement.textContent = element.FirstName;
        lastNameElement.textContent = element.LastName;
        emailElement.textContent = element.Email;
        heightElement.textContent = element.Height;
        ageElement.textContent = element.Age;

        dataDisplay.append(tableRowElement);
        tableRowElement.append(idElement, firstNameElement, lastNameElement, emailElement, heightElement, ageElement);
    });

    let totalPages = Math.ceil(data.length / elementsPerPage);

    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        let pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        let pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            displayData();
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }
};

displayData();

const toggleSortDirection = () => {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
};

sortId.addEventListener('click', async () => {
    sortBy = 'Id';
    toggleSortDirection();
    currentPage = 1;
    displayData(sortBy);
});
sortFirstName.addEventListener('click', async () => {
    sortBy = 'FirstName';
    toggleSortDirection();
    currentPage = 1;
    displayData(sortBy);
});
sortLastName.addEventListener('click', async () => {
    sortBy = 'LastName';
    toggleSortDirection();
    currentPage = 1;
    displayData(sortBy);
});
sortEmail.addEventListener('click', async () => {
    sortBy = 'Email';
    toggleSortDirection();
    currentPage = 1;
    displayData(sortBy);
});
sortHeight.addEventListener('click', async () => {
    sortBy = 'Height';
    toggleSortDirection();
    currentPage = 1;
    displayData(sortBy);
});
sortAge.addEventListener('click', async () => {
    sortBy = 'Age';
    toggleSortDirection();
    currentPage = 1;
    displayData(sortBy);
});

dataSelect.addEventListener('change', async (event) => {
    elementsPerPage = parseInt(event.target.value);
    currentPage = 1;
    displayData();
});
