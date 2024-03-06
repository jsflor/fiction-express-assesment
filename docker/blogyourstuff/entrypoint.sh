# Perform django operations
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

python manage.py createsuperuser --noinput # Default values come from environment variables

python manage.py shell <<EOF
from accounts.models import User
username = 'user'
existing_user = User.objects.filter(username=username).first()

# If the user does not exist, create it
if not existing_user:
    user = User.objects.create_user(username=username, password='TheMostSecurePasswordEver')
    
    # Set additional fields
    user.first_name = 'John'
    user.last_name = 'Doe'
    user.save()
    print(f"User '{username}' created successfully.")
else:
    print(f"User '{username}' already exists.")
EOF

# Start Gunicorn processes with 2 worker processes and 1000 connections each
gunicorn -b 0.0.0.0:8000 --reload blogyourstuff.wsgi