const React = require('react')
const Default = require('./layouts/default')

function error404() {
    return (
        <Default>
            <h1>Oops! Looks like we lost something ...</h1>
            <p>... or maybe it never existed?</p>
            <li><a href='/breads'>Go home</a></li>
        </Default>
    )
}

module.exports = error404