# Mô tả Git Flow

![GitFlow](https://github.com/user-attachments/assets/c0025a6a-dda6-47a5-aebd-6f2fa79d53e5)



Luồng Git trong hình bao gồm các nhánh chính sau:

## 1. Main
- Đây là nhánh chính dùng để phát hành các phiên bản sản phẩm đã hoàn thiện.
- Mỗi commit trong nhánh này đại diện cho một phiên bản sản phẩm ổn định để deploy.

## 2. Develop
- Nhánh này được sử dụng để tích hợp tất cả các tính năng đang phát triển.
- Sau khi các tính năng mới hoàn tất và đã được kiểm thử, chúng sẽ được hợp nhất (merge) vào nhánh Develop.

## 3. Feature
- Các nhánh Feature được tạo từ nhánh Main.
- Mỗi nhánh feature đại diện cho một tính năng mới đang được phát triển.
- Khi hoàn thành, nhánh feature sẽ được hợp nhất vào nhánh Develop.

## Quy trình chung
![Workflow](https://github.com/user-attachments/assets/a6b30427-3f98-48ea-a875-9484ca5bb7af)

### Các bước thực hiện:
1. Tạo task trên Jira để có được key task, ví dụ như trên là **KAN-4**.
2. Developer làm việc trên các nhánh **Feature** được checkout từ nhánh **Main** và đặt tên theo quy chuẩn: `feature/<key task>`, ví dụ: `feature/KAN-4`.
3. Sau khi hoàn tất và thực hiện self test, checkout từ nhánh **Develop** ra một nhánh `merge-<branch-name>-into-develop` để thực hiện merge nhánh task feature của mình vào, nhằm resolve conflict nếu có, tránh làm mất code của người khác.
4. Thực hiện merge nhánh `merge-<branch-name>-into-develop` vào nhánh Develop.
5. Cuối cùng, nhánh **Develop** sẽ được merge vào **Main** để deploy một phiên bản ổn định.
6. Trong trường hợp Developer A checkout ra nhánh **feature/..** từ Main nhưng sau đó Developer B thực hiện đẩy feature của họ vào nhánh Develop, Developer A cần thực hiện rebase code từ nhánh Main về code của mình để tránh gây conflict. (Sử dụng merge cũng được, nhưng rebase thì git flow sẽ đẹp hơn! 😊)
7. Nếu tiếp tục thực hiện task khác, thực hiện lặp lại quy trình như trên.
