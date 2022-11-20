<script lang="ts">
    import type { GuyData } from "../../stores/guyData";

    export let guyData: GuyData;
    export let index: number;

    $: guy = guyData.content[0];
    $: rest = guyData.content.slice(1).filter(line => !!line);
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
        { guy }
      </p>
      { #if rest.length }
        { #each rest as line, i (i) }
          <p>
            { line }  
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
  li {
    --border: 1px solid black;

    width: 100%;
    font-size: 1rem;
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
    display: grid;
    grid-template-columns: 5fr 1fr;

    width: 100%;
    cursor: pointer;
  }

  .guy {
    font-style: italic;
    letter-spacing: 0.03rem;

    padding-left: 0em;
  }

  @media only screen and (min-width: 500px) {
    .guy {
      padding-left: 1em;
    } 
  }

  .guy p {
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    line-height: 1.5rem;
  }

  .guy p:first-child {
    padding-top: 0.5em;
  }

  .date {
    text-align: right;
    padding-left: 1em;
    padding-top: 0.5rem;
  }
</style>