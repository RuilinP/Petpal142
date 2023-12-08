from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from .models import Notification
from django.contrib.contenttypes.models import ContentType
from accounts.models import CustomUser, Shelter
from comments.models import Comment, Reply
from application.models import Application



def is_shelter(user_id):
    cur_user = get_object_or_404(CustomUser, pk=user_id)
    if hasattr(cur_user, 'seeker'):
        return False
    return True



def create_notification_for_user(user, instance, content_type_str):
    """ helper function to create notification for a user. """
    Notification.objects.create(
        recipient=user, 
        content_object=instance,
        object_id=instance.id,
        content_type_str=content_type_str
    )



@receiver(post_save, sender=Comment)
def create_comment_notification(sender, instance, created, **kwargs):
    if created:
        determine_comment_recipient(instance)



def determine_comment_recipient(comment):
   
    # for new shelter comments, the recipient is always the shelter
    # for new application comments, the recipient is:
    # - the shelter, when author is seeker
    # - the seeker, when author is shelter

    # determine if it is a shelter or application comment
    application_content_type = ContentType.objects.get_for_model(Application)

    if comment.content_type == application_content_type:
        # need to know the author type
        if is_shelter(comment.author.id):
            content_type_str = f"You have a new application comment from applicant {comment.content_object.seeker.id}."
            recipient = comment.content_object.seeker # get seeker obj from application
        else:
            content_type_str = f"You have a new comment on your application {comment.object_id}."
            recipient = comment.content_object.shelter  # get shelter obj from application
    
    else: 
        recipient = comment.content_object # is the shelter
        content_type_str = f"Your shelter has a new comment from pet seeker {comment.author.id}."
    
    create_notification_for_user(recipient, comment, content_type_str)



@receiver(post_save, sender=Reply)
def create_reply_notification(sender, instance, created, **kwargs):
    if created:
        # if it is an application reply
        application_content_type = ContentType.objects.get_for_model(Application)

        if instance.comment.content_type == application_content_type:
            shelter = instance.comment.content_object.shelter
        else: # it is a shelter reply
            shelter = instance.comment.content_object

        create_notification_for_user(shelter, instance, "Your comment has a new reply.")

        # create notif for comment author (if author is not themselves)
        if instance.comment.author != instance.author:
            create_notification_for_user(instance.comment.author, instance, "Your comment has a new reply.")



@receiver(post_save, sender=Application)
def create_reply_notification(sender, instance, created, **kwargs):

    if created: # for new application submission, alert the shelter
        # shelter = CustomUser.objects.filter(pk=instance.shelter
        create_notification_for_user(instance.shelter, instance, "Your shelter received a new pet adoption application.")