# -*- coding: utf-8 -*-
import random
import sqlite3
import string
import sys


def insert_to_db(generated_array):
    try:
        conn = sqlite3.connect('ChatDatabase')

        cur = conn.cursor()

        for i in generated_array:
            cur.execute("INSERT INTO keyGens(keyGen, isUse) VALUES (?, ?)", [i, 0])
            conn.commit()
    except sqlite3.Error, e:
        print "Error %s:" % e.args[0]
        sys.exit(1)
        print "error sqlite db"
    finally:
        if conn:
            conn.close()


def generate_fund(N):
    result = ""
    for i in xrange(4):
        s = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
        result = result + s + "-"
    return result[0:-2]


generated_array = []

for i in xrange(100):
    generated_array.append(generate_fund(4))

insert_to_db(generated_array)
