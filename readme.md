# MERN

<p align="center">
<a href="https://www.npmjs.com/package/@kutaloweb/mern"><img src="https://img.shields.io/npm/v/@kutaloweb/mern.svg" alt="Latest Stable Version"></a>
</p>


MERN is an extended [Hashnode's](http://mern.io) scaffolding tool which makes it easy to build universal apps using Mongo, Express, React and NodeJS. It minimises the setup time and gets you up to speed using proven technologies.

Try it out here: https://mern.kutaloweb.rocks

## Getting Started

These instructions will get you a copy of the project up and running on your local Linux or Mac OS X machine

Please make sure your MongoDB is running

### Installing

Move to your web projects directory and clone the application using Git

```
cd /var/www/html
git clone https://github.com/kutaloweb/mern
```

Move to application directory

```
cd mern
```

Install the application dependencies

```
npm install
```

Execute the NPM script

```
npm run start
```

### Deploy

Run Compose to start and run your production app if you are using Docker 

```
docker-compose -f docker-compose-production.yml up -d
```

Start app with process manager PM2 if you are not using Docker (you might change the path in start.sh)

```
pm2 start start.sh --name mern
```

## Contributing

As an open project, I welcome contributions from everybody. Please, feel free to fork the repository and submit pull requests

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Premium Support

Want help with implementation or new features? Start a conversation with me: kutalo84@gmail.com
