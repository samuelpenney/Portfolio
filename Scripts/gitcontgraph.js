import { GitHubContributionGraph } from "github-contrib-graph/vanilla";
import 'github-contrib-graph/styles.css';

const widget = new GitHubContributionGraph({
    username: "samuelpenney",
    container: document.getElementById("github-contribution-graph"),
    theme: "void"
});

await widget.render();