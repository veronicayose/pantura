const searchValue = document.getElementById("search-field").addEventListener("submit", function(event){
    event.preventDefault();
    const searchForm = event.target;
    const searchFormField = searchForm.elements;

    const search = searchFormField.search.value;
    window.location.href = `./index.html?search=${search}`;
});