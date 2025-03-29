import requests
import json

BASE_URL = "https://attendipen-d65abecaffe3.herokuapp.com" #"http://127.0.0.1:5000"

# Helper function to print responses
def print_response(response):
    print(f"\n{response.request.method} {response.request.url}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=4)}")
    except ValueError:
        print(f"Response: {response.text}")

# Store tokens for authenticated requests
tokens = {
    "school": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODMxODcyNCwianRpIjoiMmJkZWY2YzYtZjIyZS00NjJmLTgzZGYtMDE3NjMzYWM3Mzk2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IntcImlkXCI6IDEsIFwidHlwZVwiOiBcInNjaG9vbFwifSIsIm5iZiI6MTczODMxODcyNCwiY3NyZiI6IjViY2Y2OWViLTcyZjAtNGZiZS05ZGRmLWRlNDVhOGI0ZjNmMyIsImV4cCI6MTc2OTg1NDcyNH0.vATS74aGomznvtflEtZiNE-fMAfX-XLhhK2cNmg5sl8",
    "teacher": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODMxODcyNiwianRpIjoiM2ExNzRkY2MtNzIxYi00Y2VmLWI2NGQtN2NhZjhiMGM5NGZjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IntcImlkXCI6IDEsIFwidHlwZVwiOiBcInRlYWNoZXJcIn0iLCJuYmYiOjE3MzgzMTg3MjYsImNzcmYiOiJiZDllM2Y5Zi1jZDFkLTRkMmQtOGQyZS0zNGEzMjQwOWQzYTAiLCJleHAiOjE3Njk4NTQ3MjZ9.s2ux6dc15N61C9JCOD4YqlKJgSl0vdOFl95q74LmT_Q",
    "parent": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODMxODcyOCwianRpIjoiNTdjYTZiMTEtMTEwMy00Yjk3LThhZjMtNzkwNjEyMDI5NGI1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IntcImlkXCI6IDEsIFwidHlwZVwiOiBcInBhcmVudFwifSIsIm5iZiI6MTczODMxODcyOCwiY3NyZiI6ImVmMmMwMDkwLWViNjUtNGVkYy05MzIwLWZlMDhjN2I2N2RlOCIsImV4cCI6MTc2OTg1NDcyOH0.LR8HlG8GdAYIW0Xo64bv-S8eW-TaavU3l0LjAXhWo58"
}

# Test 1: Register School
def test_register_school():
    url = f"{BASE_URL}/auth/register"
    payload = {
        "_type": "school",
        "name": "Test School",
        "email": "school@example.com",
        "password": "password123"
    }
    response = requests.post(url, json=payload)
    print_response(response)
    if response.status_code == 201:
        tokens["school"] = response.json()["access_token"]

def test_register_teacher():
    url = f"{BASE_URL}/auth/register"
    payload = {
        "_type": "teacher",
        "name": "John Doe",
        "email": "teacher@example.com",
        "password": "password123",
        "gender": "male"
    }
    response = requests.post(url, json=payload)
    print_response(response)
    if response.status_code == 201:
        tokens["teacher"] = response.json()["access_token"]

def test_register_parent():
    url = f"{BASE_URL}/auth/register"
    payload = {
        "_type": "parent",
        "name": "Jane Smith",
        "email": "parent@example.com",
        "password": "password123"
    }
    response = requests.post(url, json=payload)
    print_response(response)
    if response.status_code == 201:
        tokens["parent"] = response.json()["access_token"]

# Test 2: Login
def test_login_school():
    url = f"{BASE_URL}/auth/login"
    payload = {
        "email": "school@example.com",
        "password": "password123",
        "_type": "school"
    }
    response = requests.post(url, json=payload)
    print_response(response)
    if response.status_code == 200:
        tokens["school"] = response.json()["access_token"]

def test_login_teacher():
    url = f"{BASE_URL}/auth/login"
    payload = {
        "email": "teacher@example.com",
        "password": "password123",
        "_type": "teacher"
    }
    response = requests.post(url, json=payload)
    print_response(response)
    if response.status_code == 200:
        tokens["teacher"] = response.json()["access_token"]

def test_login_parent():
    url = f"{BASE_URL}/auth/login"
    payload = {
        "email": "parent@example.com",
        "password": "password123",
        "_type": "parent"
    }
    response = requests.post(url, json=payload)
    print_response(response)
    if response.status_code == 200:
        tokens["parent"] = response.json()["access_token"]

# Test 3: Create Class (School Only)
def test_create_class():
    url = f"{BASE_URL}/classes"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    payload = {"name": "JSS 1"}
    response = requests.post(url, headers=headers, json=payload)
    print_response(response)

# Test 4: List Classes (School Only)
def test_list_classes():
    url = f"{BASE_URL}/classes"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    response = requests.get(url, headers=headers)
    print_response(response)

# Test 5: Delete Class (School Only)
def test_delete_class():
    url = f"{BASE_URL}/classes/1"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    response = requests.delete(url, headers=headers)
    print_response(response)

# Test 6: Assign Teacher to Class
def test_assign_teacher_to_class():
    url = f"{BASE_URL}/classes/assign_teacher"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    payload = {
        "class_id": 1,
        "teacher_id": 1
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response(response)

# Test 7: Assign Student to Class
def test_assign_student_to_class():
    url = f"{BASE_URL}/classes/assign_student"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    payload = {
        "class_id": 1,
        "student_id": 1
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response(response)

# Test 8: List Students in a Class
def test_list_students_in_class():
    url = f"{BASE_URL}/classes/1/students"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    response = requests.get(url, headers=headers)
    print_response(response)

# Test 9: Mark Attendance (Teacher Only)
def test_mark_attendance():
    url = f"{BASE_URL}/attendance/mark"
    headers = {"Authorization": f"Bearer {tokens['teacher']}"}
    payload = {
        "class_id": 1,
        "student_id": 1,
        "status": "present"
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response(response)

# Test 10: View Attendance (School Only)
def test_view_attendance_school():
    url = f"{BASE_URL}/attendance/view/1"
    headers = {
        "Authorization": f"Bearer {tokens['school']}",
        "Content-Type": "application/json"
    } 
    response = requests.get(url, headers=headers)
    print_response(response)

# Test 11: View Attendance (Parent Only)
def test_view_attendance_parent():
    url = f"{BASE_URL}/attendance/view/1/1"
    headers = {
        "Authorization": f"Bearer {tokens['parent']}",
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)
    print_response(response)

# Test 12: Update Attendance Settings (School Only)
def test_update_attendance_settings():
    url = f"{BASE_URL}/settings/attendance_time"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    payload = {
        "start_time": "07:30",
        "end_time": "16:00"
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response(response)

# Test 13: Get Attendance Settings
def test_get_attendance_settings():
    url = f"{BASE_URL}/settings/attendance_time"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    response = requests.get(url, headers=headers)
    print_response(response)

# Test 14: Send Teacher Offer
def test_send_teacher_offer():
    url = f"{BASE_URL}/invites/send_offer"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    payload = {
        "email": "teacher@example.com",
        "salary": 50000
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response(response)

# Test 15: Accept Teacher Offer
def test_accept_teacher_offer():
    url = f"{BASE_URL}/invites/accept_offer/2"
    headers = {"Authorization": f"Bearer {tokens['teacher']}"}
    response = requests.post(url, headers=headers)
    print_response(response)

# Test 16: Send Parent Invite
def test_send_parent_invite():
    url = f"{BASE_URL}/invites/send_invite"
    headers = {"Authorization": f"Bearer {tokens['school']}"}
    payload = {
        "email": "parent@example.com",
        "student_name": "Student A",
        "student_dob": "2010-01-01",
        "class_id": 1,
        "gender": "male"
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response(response)

# Test 17: Accept Parent Invite
def test_accept_parent_invite():
    url = f"{BASE_URL}/invites/accept_admission/3"
    headers = {"Authorization": f"Bearer {tokens['parent']}"}
    response = requests.post(url, headers=headers)
    print_response(response)

# Run Tests
def run_tests():
    # print("Testing Registration Endpoints")
    # test_register_school()
    # test_register_teacher()
    # test_register_parent()
    
    # print("\nTesting Login Endpoints")
    # test_login_school()
    # test_login_teacher()
    # test_login_parent()
    
    print("\nTesting Class Management")
    # test_create_class()
    # test_list_classes()
    test_view_attendance_school()
    
    
    #test_delete_class()
    test_assign_teacher_to_class()
    test_assign_student_to_class()
    # test_list_students_in_class()
    
    
    print("\nTesting Attendance Management")
    # test_mark_attendance()
    # test_view_attendance_school()
    test_view_attendance_parent()

    # print("\nTesting Settings Management")
    # test_update_attendance_settings()
    # test_get_attendance_settings()
    
    
    print("\nTesting Invite Management")
    # test_send_teacher_offer()
    test_accept_teacher_offer()
    # test_send_parent_invite()
    test_accept_parent_invite()

if __name__ == "__main__":
    run_tests()
