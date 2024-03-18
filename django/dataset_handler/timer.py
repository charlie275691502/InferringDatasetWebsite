import time

def print_time(func) :
    start_time = time.time()
    ret = func()
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("Time elapsed:", elapsed_time, "seconds")
    return ret