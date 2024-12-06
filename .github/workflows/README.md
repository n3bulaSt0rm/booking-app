# MÔ TẢ LUỒNG COMMIT TRIGGER CI/CD WORKFLOWS

## 1. CI (ci.yaml)
- Luồng CI sẽ tự động chạy khi có commit và pull request
## 2. CD (cd.yaml)
- Commit thay đổi:
```
git add .
git commit -m "message"
```

- Đẩy branch (thường là nhánh main):
```
git push origin <branch-name>
```

- Tạo và đẩy tag:
```
git tag docker-v1.1.0
git push origin docker-v1.1.0
```
###3. Render deployment (render.yaml)