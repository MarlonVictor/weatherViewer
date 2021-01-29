export default function useLocalStorage(type, name) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    const index = favorites.indexOf(name)
    const existsInLocalStorage = index != -1


    if (type === 'save' && !existsInLocalStorage) {
        favorites.push(name)
    }

    if (type === 'delete') {
        favorites.splice(index, 1)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
    return favorites
}