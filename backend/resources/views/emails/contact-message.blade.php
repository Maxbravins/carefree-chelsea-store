<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">

    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> {{ $contact['name'] }}</p>

    <p><strong>Email:</strong> {{ $contact['email'] }}</p>

    @if (!empty($contact['phone']))
        <p><strong>Phone:</strong> {{ $contact['phone'] }}</p>
    @endif

    <p><strong>Subject:</strong> {{ $contact['subject'] }}</p>

    <hr>

    <p><strong>Message:</strong></p>

    <p style="white-space: pre-line;">
        {{ $contact['message'] }}
    </p>

    <hr>

    <p>
        You can reply directly to this email to respond to the customer.
    </p>

</body>
</html>