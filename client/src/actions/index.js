import axios from 'axios';

export function getBooks(limit = 10, start = 0, order = 'asc', list = null) {
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
        if(list) {
            return [...list, ...response.data];
        }
        else {
            return response.data;
        }
    });

    return {
        type: 'GET_BOOKS',
        payload: request
    }
}

export function getBookWithReviewer(ownerId) {
    const request = axios.get(`/api/getBook?id=${ownerId}`);

    return (dispatch) => {
        request.then(({data}) => {
            let book = data;

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data}) => {

                let response = {
                    book,
                    reviewer: data
                }
                console.log(response);
                
                dispatch({
                    type: 'GET_BOOK_WITH_REVIEWER',
                    payload: response
                });
            });
            
            
        });
    }
}

export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_WITH_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }
}