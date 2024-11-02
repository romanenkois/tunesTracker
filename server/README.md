# TunesTracker Server

bla bla bla

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [License](#license)

## Introduction

used for tunes tracker client side, as a bridge in between with spotify api

## Features

- RESTful API

## Installation

To install and run the TunesTracker Server, follow these steps:

1. Install dependencies

    $ npm install

2. Set up environment variables

    Create a `.env` file in the root directory with next structure

    ```env
    PORT={number, could be 3000}

    SPOTIFY_CLIENT_ID='string'
    SPOTIFY_CLIENT_SECRET='string'
    SPOTIFY_REDIRECT_URI={string, link of redirection}
    ```

3. Run the server:

    $npm start

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.
