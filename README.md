# Change Reason Override
A project level EM that replaces the 'Provide a reason for change' textarea field with a simple dropdown selection.


Config options include:
- `choices`
  - List of choices to display in the dropdown selection menu (comma delimited list)
- `enable_other`
  - Checkbox to add an `other` option to the selection options


Configuration example:
```text
choices = [
    Punctuation Error,
    Incorrect Statement,
    Null value found
]
enable_other = true
```

This external module also generates a sidebar link that allows users to view a bar chart visualization representing how
frequently each change reason has been selected.
