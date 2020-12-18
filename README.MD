# Fastest slither.io server finder

This is a chrome extension project, aim is to play slither.io on the fastest server based on ping times whenever slither.io is opened.

## Why

We all want to grow our snakes as large as possible. To do this a good internet is required is obviously, but slither.io has a lot of servers and one of them is chosen randomly on game init. This leads to laggy experience whenever selected server is far away from the player.

## How

This extension injects a content script to the slither page and pings available servers to select the fastest one. This is possible because slither exposes `window.sos` object which is a list of server addresses. If there is only one address in that list then naturally it will be selected all the time.

## How to use

Pack the extension from chrome extensions page on developer mode or load folder directly to it.

### Disclaimer

This is not affiliated with or related to slither.io by any means. I do not know if the extension can be treated as illegal. use at your own risk.
