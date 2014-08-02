todo
====

Todo is a utility for developers working with GitHub and Jira for their projects.

## todo list [&lt;order-by&gt;] [&lt;users&gt;] [--all] [--available] [--unassigned] [--done] 

### DESCRIPTION

Lists tasks assigned to the specified user, or you

### OPTIONS

#### --all

Lists all tasks in the current sprint.

#### --available

Lists all unassigned tasks or the tasks that are assigned to the user.

#### --done

Includes tasks that are complete.

#### --unassigned

Lists all tasks that are unassigned

#### &lt;orber-by&gt;

Sets how the list of tasks will be ordered. This is determined by two 
parts. The first character is either a `-` or a `+` representing 
ascending or decending respectively. 

The second part follows the following values:

* a - alphabetically (+ is a first)
* d - date added (+ is oldest first)
* o - sorted order (+ is top first)
* p - priority (+ is highest first)
* q - queue (+ is order added to queue) (default)

For instance, if you want see the list of tasks sorted as they appear 
on JIRA, then you could either use `todo list` as the default or, 
`todo list -o`.

If you wanted to see the list of tasks sorted first by priority and
then by the most recent, you would use `todo list +p -d`.

#### &lt;users&gt;

Shows tasks that are assigned to the listed users. User names are the Slack
usernames, and are denated with a proceding `@` symbol.


## todo start &lt;JIRA-task-number&gt;

### DESCRIPTION

Starts the specified task number. This performs the following actions:

1. Assigns the task to the user. (If it isn't already)
2. Transitions the task to In Progress.
3. Fetches the specified develop branch.
4. Creates a new git branch off of the develop branch.

## todo pop [&lt;order&gt;]

### DESCRIPTION

Starts the next task in line, as defined by the order. This is determined by
two parts. The first character is either a `-` or a `+` representing 
ascending or decending respectively. 

The second part follows the following values:

* a - alphabetically (+ is a first)
* d - date added (+ is oldest first)
* o - sorted order (+ is top first)
* p - priority (+ is highest first)
* q - queue (+ is order added to queue) (default)

For instance, if you want see the list of tasks sorted as they appear 
on JIRA, then you could either use `todo list` as the default or, 
`todo list -o`.

If you wanted to see the list of tasks sorted first by priority and
then by the most recent, you would use `todo list +p -d`

This performs the following actions:

1. Assigns the task to the user. (If it isn't already)
2. Transitions the task to In Progress.
3. Fetches the specified develop branch.
4. Creates a new git branch off of the develop branch.

## todo done [&lt;title&gt;] [&lt;message&gt;] [-fv] [--force] [--view]

### DESCRIPTION

Marks the current task as complete. 

If there are modified tracked files, then an error message will be displayed
to the user, and no further actions will be taken.

When a task is marked as complete, it will perform the following actions:

1. Push the current branch to the origin feature branch.
2. Create a pull request on the develop branch with the title and message listed.
3. Transition the JIRA task to the Dev Complete state.
4. Attach a comment with the title and message.
5. If the view flag is set, then the browser will open to the pull request.

### OPTIONS

#### --force, -f

Ignore the check for uncommited changes.

#### --view, -v

Setting this flag will cause the browser to open, once the pull request has
been made.

#### &lt;title&gt;

The title of the pull request and JIRA comment. This should be enclosed in
quotes.

#### &lt;message&gt;

The body of the message that should be added to the pull request, and the
JIRA comment.