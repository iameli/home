#!/usr/bin/env python
import getpass
from pyicloud import PyiCloudService

pw = getpass.getpass(prompt='What is your favorite color? ')
api = PyiCloudService('ekmallon@gmail.com', pw)
api.iphone.play_sound()
