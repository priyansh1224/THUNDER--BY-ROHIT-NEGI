Lecture01 Notes: https://app.notion.com/p/Lecture01-Introduction-to-Javascript-37243ac5cab9802293fff4573c26a6f4?source=copy_link

Lecture02 Notes: https://app.notion.com/p/Lecture-02-Data-types-in-JS-37343ac5cab980f8b24ee3cf1ea0c8fa?source=copy_link

Lecture03 Notes: https://app.notion.com/p/Lecture03-Operator-and-Data-type-in-JS-37543ac5cab9805bb338dc7e6c3ab515?source=copy_link

Lecture04: https://app.notion.com/p/Lecture04-Loop-Number-math-and-String-37643ac5cab9802ba80ffca6c7e961d6?source=copy_link

Lecture05: https://app.notion.com/p/Lecture05-37743ac5cab980fc90afeec0d60a0fda?source=copy_link

Lecture06: https://app.notion.com/p/Lecture06-Array-and-Objects-in-Javascript-37943ac5cab9807f801cc8c83755decc?source=copy_link

Lecture07: https://app.notion.com/p/Lecture-07-Objects-and-Date-37b43ac5cab980cfa8d3db0bf87411b2?source=copy_link

Lecture08: https://app.notion.com/p/Lecture08-Date-and-Functions-in-JS-37c43ac5cab98043bcfafdc2a70c7a3a?source=copy_link

Lecture09: https://app.notion.com/p/Lecture09-Callback-forEach-map-filter-reduce-37d43ac5cab980e0a44ef39a89b81143?source=copy_link

Lecture10: https://app.notion.com/p/Lecture10-Introduction-To-DOM-38043ac5cab980adbbdeffd5e8dc6ae8?source=copy_link

Lecture11: https://app.notion.com/p/Lecture11-CRUD-and-Event-in-DOM-38143ac5cab980d48176fda6b086cfef?source=copy_link

Lecture12: https://app.notion.com/p/Lecture12-Even-and-Project-in-Javascript-38343ac5cab980aab918f7f4dc5c2fff?source=copy_link

Lecture14: https://app.notion.com/p/Lecture14-Project-in-Javascript-38443ac5cab9809ba1e9fbcf3c776723?source=copy_link

Lecture15: https://app.notion.com/p/Lecture15-JSON-vs-JS-Object-38843ac5cab9801e9c30f80559f919a0?source=copy_link

Lecture16: https://app.notion.com/p/Lecture16-Memory-management-and-How-JS-code-works-38b43ac5cab980af918bf13d86ec5d6c?source=copy_link

Lecture17: https://app.notion.com/p/Lecture-17-Prototype-classes-and-Eventloop-in-JS-38c43ac5cab9805f9b60eaf160aa057e?source=copy_link

Lecture18: https://app.notion.com/p/Lecture18-Callback-Hell-and-Promises-38e43ac5cab980358e38c75eae99dc6b?source=copy_link

https://app.notion.com/p/Lecture-19-Closure-and-This-Keyword-38f43ac5cab9806e98f2f95649ffb759?source=copy_link

//data sets 
// https://api.github.com/users
// "https://api.github.com/users?per_page=20"



//  const url = "https://text.pollinations.ai/" + encodeURIComponent(message);



// # Get latest rates with USD as base
// https://api.frankfurter.dev/v1/latest?base=USD

// # Convert USD to INR specifically
// https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR

// # Get multiple targets at once
// https://api.frankfurter.dev/v1/latest?base=INR&symbols=USD,EUR,GBP,JPY

// # Historical rate on a specific date
// https://api.frankfurter.dev/v1/2024-01-15?base=USD&symbols=INR

// # Time series (rates over a date range, good for graphs)
// https://api.frankfurter.dev/v1/2026-01-01..2026-06-01?base=USD&symbols=INR

// # List of all supported currencies
// https://api.frankfurter.dev/v1/currencies




// # Bitcoin price in USD
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

// # Bitcoin price in INR (for Indian students!)
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr

// # Multiple coins, multiple currencies, with 24h change + market cap
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd,inr&include_24hr_change=true&include_market_cap=true

// # Top 50 coins by market cap (great for a "crypto leaderboard" project)
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1

// # Historical price chart data (last 30 days, for graphs)
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30

// # Search any coin by name
// https://api.coingecko.com/api/v3/search?query=shiba