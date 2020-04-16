### Project: Find movie by name

2020/04/16 Julie Kwok

[demo here](https://julienemo.github.io/thp_next_9/)

* * *
This alternative searching movie engine uses [Omdb API](http://www.omdbapi.com/). Its working logique is the following

1. takes a user input. On submit (`enter`), if input is shorter than 3 letters, error. Else, go further
2. makes an API call to Omdb with the input. 10 of the movies with a title containing the exact match of the input will be returned and will appear on the page. We see the title, the year of release and the poster and a button to 'see more'. When the API doesn't return a poster, a general indication will be shown.
3. when 'see more' button clicked, page takes the IMDB ID and makes another call to get movie detail, fills the plot into a modal, and opens a modal.
4. any card that appears on and disappears from the page will have an animation effect (intersection observer + CSS).