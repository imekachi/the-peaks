# The Peaks

A news website powered by The Guardian Open Platform API
as an assignment for front-end dev test.

![The peaks home page mobile](https://raw.githubusercontent.com/imekachi/the-peaks/master/screenshot-mobile.png)
![The peaks home page desktop](https://raw.githubusercontent.com/imekachi/the-peaks/master/screenshot-desktop.png)

You can try out the [demo page here](https://the-peaks-imekachi.vercel.app/).

## Local development mode
> API key for The Guardian Open Platform API is required.
1. clone this repo
```bash
$ git clone https://github.com/imekachi/the-peaks.git
```
2. Install dependencies
```bash
$ cd the-peaks
$ yarn
```
3. Create a file `.env.local` and add API key
```dosini
# .env.local
NEXT_PUBLIC_API_KEY=your_api_key_here
```
4. Start dev server
```bash
$ yarn dev
```
5. Open browser and go to [http://localhost:3000](http://localhost:3000)

## Resources
- [The Guardian Open Platform API Doc](https://open-platform.theguardian.com/documentation/)
