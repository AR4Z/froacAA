from crontab import CronTab
import sys

arguments = sys.argv
repo_id = arguments[1]
days = arguments[2]
my_cron = CronTab(user='ar4z')
update = False
for job in my_cron:
    if job.comment == repo_id:
        job.day.every(days)
        update = True
        break

if not update:
    job = my_cron.new(command='echo hola', comment=repo_id)
    job.day.every(days)
 
my_cron.write()

