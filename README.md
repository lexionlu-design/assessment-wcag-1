# WCAG Assessment 1

This assessment is to evaluate your understanding of WCAG standard and your web front-end skill. We would like to see your opinion and your idea toward this issue.

The accessibility assessment report and screenshot is attached at `WCAG Issue 584386.pdf` and `WCAG Issue 584386.png`.

### Description

Data table - General: The content visually apperats to be a data table but is not marked up as one.
Element name: Taipei - Macau flights timetable
Table conlumns headers:
- TPETaoyuan International AirportTerminal 1MFMMacau International Airport
- TueJul27, WedJul28, ThuJul29,.......
- Table rows headers: JX0201, JX1301, JX0203,........
Location of the element: Flights timetable data table, in the main content.

### Recommendation to fix

Rule: Tabular data SHOULD be represented in a `<table>`.
How to fix: Fix this issue by doing ALL of the following:
1. Markup data that appears logically as a table using `<table>`, `<tr>`, and `<td>` elements.
2. Ensure that header cell and data cell relationships are correctly coveyed according to the complexity of the table.
3. If possible, and a `<caption>` element as the first child of the `<table>` element cotaining the name or title of the table.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

