from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    website = models.URLField()

    def __str__(self):
        return f'{self.name} ({self.username})'  # Representação legível para o usuário

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=100)
    body = models.TextField()

    def __str__(self):
        return self.title  # Retorna o título do post como a representação legível

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=100)
    email = models.EmailField()
    body = models.TextField()

    def __str__(self):
        return f'Comment by {self.name} on {self.post.title}'  # Representação do comentário com o nome e post

class Album(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="albums")
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title  # Representação legível do título do álbum

class Photo(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="photos")
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()

    def __str__(self):
        return f'Photo: {self.title} in {self.album.title}'  # Representação legível da foto com o título do álbum

class ToDo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos")
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'ToDo: {self.title} - {"Completed" if self.completed else "Pending"}'  # Representação legível da tarefa
