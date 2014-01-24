experimenting with $watch

1. before - http://plnkr.co/edit/mcTY1F4cevDEZgkw0noV?p=preview

Problem: `$watch` is called during each `$digest` cycle and calls `listener` if the value of the `watchExpression` changes. Because I am triggering `$watch` when the user clicks a button, it isn't possible for the value of `watchExpression` to have changed since the last `$digest` cycle.

2. after - 
