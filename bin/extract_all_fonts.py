#!/usr/bin/env python3

# This script extracts all font attachments of a Matroska file
# Requirements: mkvtoolnix executables

import subprocess
import re
import os.path
from collections import namedtuple

# User settings #############

print_debug = False
video = r"e:\Video\Anime\_AKA\One Piece\[AKA] One Piece 650 [x264,720p][Hi10P][355CD52C].mkv"

# Defaults ##################

match_extension = lambda name: re.search(r"\.(ttf|otf)$", name, re.I)
attachment_types = ('application/x-truetype-font', 'application/vnd.ms-opentype')

mkvtoolnix = "C:\\Program Files (x86)\\MKVtoolnix\\"
regexp_track = re.compile(r"^Track ID (?P<id>\d+): (?P<type>\w+) \((?P<codec>[^\)]+)\)$", re.M)
regexp_attachment = re.compile(r"^Attachment ID (?P<id>\d+): type '(?P<type>[^']+)', size (?P<size>\d+) bytes, file name '(?P<name>[^']+)'$", re.M)


# Functions #################

def debug(*args):
    if print_debug:
        print(*args)


def mkv(tool, *params):
    cmd = ('%smkv%s.exe' % (mkvtoolnix, tool), '--ui-language', 'en') + params
    return subprocess.check_output(cmd, universal_newlines=True)

# Use awesome namedtuples as a C "const struct"
MatroskaContainer = namedtuple("MatroskaContainer", 'tracks attachments')
Track = namedtuple("Track", 'id type codec')
Attachment = namedtuple("Attachment", 'id type size name')


def mkvidentify(video):
    identify = mkv("merge", "--identify", video)
    debug(identify)

    collect = lambda r, c: [c(*x) for x in r.findall(identify)]

    return MatroskaContainer(collect(regexp_track, Track),
                             collect(regexp_attachment, Attachment))


# The code ##################

def main():
    # Collect informatiom
    container = mkvidentify(video)
    debug(container)
    attachments = container.attachments
    print("Found %d attachments for %s" % (len(attachments), video))

    count = 0
    for i, attach in enumerate(attachments):
        extension_matches = match_extension(attach.name)
        type_matches = attach.type in attachment_types

        # Disregard irrelevant attachments
        if not extension_matches and not type_matches:
            print("Skipping '{0.name}' ({0.id})...".format(attach))
            continue
        elif os.path.exists(attach.name):
            print("'{0.name}' ({0.id}) already exists, skipping...".format(attach))
            continue
        elif not extension_matches:
            print("Type mismatch but extention of a font; still extracting... ('{0.name}', {0.type})".format(attach))
        elif not type_matches:
            print("Extension mismatch but type of a font; still extracting... ('{0.name}', {0.type})".format(attach))
        else:
            print("Extracting '{0.name}'...".format(attach))

        # Extract
        try:
            debug(mkv("extract", "attachments", video, '{0.id}:{0.name}'.format(attach)))
        except subprocess.CalledProcessError as e:
            print(e)
        else:
            count += 1

    # The end
    print("Extracted %d fonts." % count)
    print()
    try:
        input()
    except:
        pass

if __name__ == "__main__":
    main()
