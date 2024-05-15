<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/oskarkraemer/vocabonline/master/frontend/public/vokabelLogo.svg" alt="proTodo Logo">

<h3 align="center">vokabel - Online vocabulary learning platform</h3>

  <p align="center">
    Parse PDFs and learn vocabulary <b>using a modern web interface</b>.
    <br />
    <br />
    <a href="https://github.com/oskarkraemer/proTodo/issues">Report Bug</a>
    ·
    <a href="https://github.com/oskarkraemer/proTodo/issues">Request Feature</a>
    <br>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technical-explanation">Technical explanation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This project aims to provide a modern and simple way to learn and memorize vocabulary. Built using React and Tailwind CSS <br>(+ shadcn UI), it offers a compelling and responsive UI.
In order to provide accurate and atomatic definitions and synonyms for the vocuabulry, voakbel utilizes the [BigHugeThesaurus API](https://words.bighugelabs.com/) as well as the [Free Dictionary API ](https://dictionaryapi.dev/).
<br>


![Image showing the vocabulary sets](https://github.com/oskarkraemer/vocabonline/blob/master/screenshots/sc0.PNG?raw=true)<br><br>
![Image showing the learning process](https://github.com/oskarkraemer/vocabonline/blob/master/screenshots/sc2.PNG?raw=true)<br><br>
![Image showing the learning result](https://github.com/oskarkraemer/vocabonline/blob/master/screenshots/sc3.PNG?raw=true)<br><br>


### Built With
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* At least Java 17

### Installation
- Run `git clone https://github.com/oskarkraemer/vocabonline.git`

#### Environment variables
- Create `.env` file with the following environment variables:
- `DB_URL = "<postgres dbURL">"`
- `DB_USER = "<postgres user string>"`
- `DB_PASSWORD = "<postgres user password"`
- `BHT_API_KEY = "<BigHugeThesaurus API key>"` [Obtain here](https://words.bighugelabs.com/account/getkey)
- `AUTH_SALT = "<random string to use for password hash salt>"`

#### Using Docker-compose
- Run `docker compose up` in directory

#### Manual
- Run `java -jar ./out/artifacts/vocabonline_jar/vocabonline.jar`


<!-- USAGE EXAMPLES -->
## Usage

* ***Create Admin user***: Currently only possible manually: Add entry to `user_account` table with password hash being a SHA1 hash, salted using `AUTH_SALT` env.
* ***Import PDF***: Press **Import PDF** and upload. The PDF is parsed for vocabulary and their corresponding translation. A new list is created.
* ***Open List***: Click on the **newly created** and you are presented with the parsed vocabulary, including synonym annotations.
* ***Learn List***: Click **Learn All** to learn all words in the list; click **Learn Hard** to only learn difficult words (often answered wrongly).
  <br><br>
  ![Image showing the vocabulary list](https://github.com/oskarkraemer/vocabonline/blob/master/screenshots/sc1.PNG?raw=true)<br><br>
   

<!-- TECH -->
## Technical explanation

After a new PDF is parsed, a list is created and the following steps are executed:
* BigHugeThesaurus is queried in order to obtain **synonyms and antonyms**.
* [Free Dictionary API ](https://dictionaryapi.dev/) is queried to obtain **definitions, phonetics, examples and the part of speech**
* The data is inserted into the **PostgreSQL** database, visualized using the following model.
  <br><br>
  ![Image showing the relational model of the DB](https://github.com/oskarkraemer/vocabonline/blob/master/screenshots/voc_rm.png?raw=true)<br><br>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Oskar Krämer - 05262020@protonmail.com
