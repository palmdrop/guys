<script lang="ts">
    import type { GuyData } from "../../stores/guyData";

    export let guyData: GuyData;
    export let index: number;

    // Kudos https://betterprogramming.pub/detecting-external-links-in-a-paragraph-of-text-with-javascript-automatically-3c15537f4997
    const linkRegex = /(https?:\/\/)[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    const newlineRegex = /\r?\n/g;

    const processLine = (line: string) => {
      return line
        .split(newlineRegex)
        .map(line => 
          line.replaceAll(
            linkRegex,
            url => {
              return `
                <a 
                  noreferrer 
                  noopener 
                  target="_blank" 
                  href=${url}
                  class="link"
                >
                  ${url}
                </a>`;
            }
          )
        );
    };

    $: guyLines = guyData
      .content
      .filter(Boolean)
      .map(processLine)
      .flat();

    $: guy = guyLines[0];
    $: rest = guyLines.slice(1);

    $: date = new Date(
        Date.parse(guyData.date)
      ).toLocaleString('en-uk', {
        dateStyle: "short" 
      })
</script>

<li>
  <a 
    class="guy-entry"
    id={"" + index}
    href={"#" + index}
    draggable="false"
  >
    <div class="guy">
      <p>
        {@html guy }
      </p>
      { #if rest.length }
        { #each rest as line, i (i) }
          <p>
            { @html line }  
          </p>
        { /each }
      { /if }
    </div>
    <time class="date">
      { date }
    </time>
  </a>
</li>

<style>
  li:first-child {
    counter-reset: reversed(guys);
  }

  li {
    --border: 1px solid black;

    width: 100%;
    font-size: 1rem;

    position: relative;
  }

  li:not(:last-child) {
    border-bottom: var(--border);
  }

  a {
    color: black;
    text-decoration: none;
    outline: none;

    position: relative;
    user-select: text;
  }

  .guy-entry {
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column-reverse;
  }

  .guy {
    font-style: italic;
    letter-spacing: 0.03em;
    line-height: 1.1em;

    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 0em;
  }

  li::before {
    position: absolute;
    top: 0.5rem;
    left: 0.2rem;
    content: counter(guys) ".";
    opacity: 0.5;

    text-decoration: underline;

    counter-increment: guys -1;
  }

  .guy p {
    padding-right: 0.5em;
    padding-bottom: 0.5em;
  }

  .guy p:first-child {
    padding-top: 0.5em;
  }

  .date {
    text-align: right;
    padding-left: 1em;
    padding-top: 0.5em;
    opacity: 0.5;
    text-decoration: underline;
  }

  @media only screen and (min-width: 500px) {
    .guy-entry {
      display: grid;
      grid-template-columns: 5fr 1fr;

      width: 100%;
      cursor: pointer;
    }

    .guy {
      padding-left: 1em;
      line-height: 1.2em;
    } 

    .date {
      opacity: 1;
      text-decoration: none;
    }

    li::before {
      content: "";
    }
  }
</style>