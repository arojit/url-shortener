import json
import unittest
from app import app


class FlaskTest(unittest.TestCase):

    def test_index(self):
        tester = app.test_client(self)
        response = tester.get("/")
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_generate_tiny_url(self):
        tester = app.test_client(self)
        data = {
            "original_url": "http://test.com"
        }
        response = tester.post("/api/generate-tiny-url", data=json.dumps(data),
                               headers={'Content-Type': 'application/json'})

        status_code = response.status_code
        self.assertEqual(status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_generate_tiny_url_without_payload(self):
        tester = app.test_client(self)
        response = tester.post("/api/generate-tiny-url")

        status_code = response.status_code
        self.assertEqual(status_code, 400)

    def test_fetch_all_url(self):
        tester = app.test_client(self)
        response = tester.get("/api/fetch-all-url")
        status_code = response.status_code
        self.assertEqual(status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_redirect_url(self):
        tester = app.test_client(self)
        response = tester.get("/api/A@#$%")
        status_code = response.status_code
        self.assertEqual(status_code, 404)


if __name__ == "__main__":
    unittest.main()
